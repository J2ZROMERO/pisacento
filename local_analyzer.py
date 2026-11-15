"""Local inference only. Receives decoded mono float32 audio from the local app."""
from pathlib import Path
import argparse,json,os,time,sys
ROOT=Path(__file__).resolve().parent
os.environ['NUMBA_CACHE_DIR']=str(ROOT/'.numba-cache')
os.environ['TORCH_HOME']=str(ROOT/'models')
import numpy as np
import torch
import librosa
from beat_this.inference import Audio2Beats

def analyze_file(path,sr,model):
 start=time.perf_counter();torch.set_num_threads(2)
 audio=np.fromfile(path,dtype='<f4')
 if not len(audio) or len(audio)>sr*1800 or not np.isfinite(audio).all():raise ValueError('Audio inválido o mayor de 30 minutos')
 duration=len(audio)/sr
 if duration<8 or np.sqrt(np.mean(audio**2))<.0001:return {'ok':True,'valid':False,'beats':[],'engine':'Beat This! '+model}
 engine=Audio2Beats(checkpoint_path=str(ROOT/'models'/(model+'.ckpt')),device='cpu',dbn=False)
 model_beats,model_downbeats=engine(audio,sr);model_beats=np.asarray(model_beats,dtype=float);
 plp_audio=librosa.resample(audio,orig_sr=sr,target_sr=22050) if sr!=22050 else audio
 pulse=librosa.beat.plp(y=plp_audio,sr=22050);indices=np.flatnonzero(librosa.util.localmax(pulse));beats=librosa.frames_to_time(indices,sr=22050);
 downbeats=np.array(sorted(set(float(beats[np.argmin(abs(beats-t))]) for t in model_downbeats if len(beats) and np.min(abs(beats-t))<=.12)),dtype=float)
 candidates=[]
 if len(model_beats)>1 and len(beats)>1:
  model_bpm=60/np.median(np.diff(model_beats));plp_bpm=60/np.median(np.diff(beats))
  if abs(model_bpm/plp_bpm-1)>.12:candidates.append({'start':0.,'end':len(audio)/sr,'kind':'disagreement','label':'Detectores discrepan sobre tempo o mitad/doble · revisar conteo'})
 if len(model_downbeats) and len(downbeats)<len(model_downbeats)*.7:candidates.append({'start':0.,'end':len(audio)/sr,'kind':'downbeat','label':'Pulsos y compases no coinciden suficientemente · revisar primer 1'})
 beats=beats[(beats>=0)&(beats<duration)];downbeats=downbeats[(downbeats>=0)&(downbeats<duration)]
 # Anchor the dance guide to an estimated bar start rather than an arbitrary first transient.
 # Choosing the dance-cycle 1 versus 5 still needs musical verification.
 if len(beats)>1 and len(downbeats):
  index=int(np.argmin(abs(beats-downbeats[0])));beats=beats[index:]
 if len(beats)<2:return {'ok':True,'valid':False,'beats':[],'engine':'Beat This! '+model}
 intervals=np.diff(beats);bpm=float(60/np.median(intervals));diagnostics=list(candidates)
 def add(a,b,kind,label):
  if diagnostics and diagnostics[-1]['kind']==kind and a<=diagnostics[-1]['end']+.5:diagnostics[-1]['end']=min(duration,b)
  else:diagnostics.append({'start':float(a),'end':float(min(duration,b)),'kind':kind,'label':label})
 for i,gap in enumerate(intervals):
  if gap>np.median(intervals)*1.65:add(beats[i],beats[i+1],'weak','Intervalo sin pulso resuelto · revisar conteo')
 for i in range(4,len(intervals)-4):
  before=np.median(intervals[i-4:i]);after=np.median(intervals[i:i+4])
  if abs(after/before-1)>.1:add(beats[i],beats[min(i+4,len(beats)-1)],'tempo','Posible cambio de tempo · revisar')
 hop=max(1,round(sr*.02));energy=np.array([np.sqrt(np.mean(audio[i:i+hop]**2)) for i in range(0,len(audio),hop)]);peak=max(float(energy.max()),.00001)
 quiet=None
 for i,v in enumerate(energy):
  t=i*hop/sr
  if v<max(.00015,peak*.015):
   if quiet is None:quiet=t
  elif quiet is not None:
   if t-quiet>=1.2:add(quiet,t,'silence','Silencio o corte · pulso no verificable por audio')
   quiet=None
 if quiet is not None and duration-quiet>=1.2:add(quiet,duration,'silence','Silencio o corte · pulso no verificable por audio')
 wave=[float(np.max(energy[a:max(a+1,b)])) for a,b in zip(np.linspace(0,len(energy),201,dtype=int)[:-1],np.linspace(0,len(energy),201,dtype=int)[1:])]
 mean2=[]
 for second in range(0,int(duration),2):
  seg=energy[int(second*sr/hop):int((second+2)*sr/hop)];mean2.append(float(seg.mean()) if len(seg) else 0)
 changes=[]
 for i in range(2,len(mean2)-1):
  previous=(mean2[i-1]+mean2[i-2])/2;ratio=mean2[i]/max(previous,.00001)
  if (ratio>1.65 or ratio<.5) and mean2[i]>.003 and (not changes or i*2-changes[-1]>8):changes.append(i*2)
 return {'ok':True,'valid':True,'engine':'librosa PLP + Beat This! '+model+' · CPU','model':model,'beats':beats.tolist(),'downbeats':downbeats.tolist(),'downbeatEstimated':bool(len(downbeats)),'bpm':round(bpm,1),'offset':float(beats[0]),'periodicity':None,'duration':duration,'wave':wave,'changes':changes[:20],'diagnostics':sorted(diagnostics,key=lambda a:a['start'])[:80],'analysisSeconds':round(time.perf_counter()-start,3),'scope':'full_audio','danceCycleVerified':False}

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--input',required=True);parser.add_argument('--sample-rate',type=int,default=11025);parser.add_argument('--model',choices=['small0','final0'],default='final0');args=parser.parse_args()
 try:print(json.dumps(analyze_file(args.input,args.sample_rate,args.model)),flush=True)
 except Exception as e:print(json.dumps({'ok':False,'error':str(e)}),flush=True);sys.exit(1)
