from pathlib import Path
import os,json,time,subprocess,sys,traceback
ROOT=Path(__file__).resolve().parent;PROJECT=ROOT.parent
os.environ['NUMBA_CACHE_DIR']=str(PROJECT/'.numba-cache')
import numpy as np
import soundfile as sf
import librosa
import mir_eval
import torch
torch.set_num_threads(2)
from beat_this.inference import Audio2Beats
RESULTS=[];MODELS={}
for name in ['small0','final0']:
 start=time.perf_counter()
 try:MODELS[name]=Audio2Beats(checkpoint_path=str(PROJECT/'models'/(name+'.ckpt')),device='cpu',dbn=False);print('Loaded',name,round(time.perf_counter()-start,2),flush=True)
 except Exception as e:print('MODEL ERROR',name,str(e),flush=True)
def score(ref,pred):
 if not len(pred):return {'f1_70ms':0,'median_nearest_ms':None}
 ref=np.asarray(ref);pred=np.asarray(pred);return {'f1_70ms':float(mir_eval.beat.f_measure(ref,pred,f_measure_threshold=.07)),'median_nearest_ms':float(np.median(np.min(np.abs(ref[:,None]-pred[None,:]),axis=1))*1000)}
def analyze(name,y,sr):
 if name.startswith('beat_this_'):return MODELS[name.removeprefix('beat_this_')](y,sr)
 if name=='librosa_dp':
  _,b=librosa.beat.beat_track(y=y,sr=sr,trim=False);return librosa.frames_to_time(b,sr=sr),[]
 if name=='librosa_plp':
  pulse=librosa.beat.plp(y=y,sr=sr);b=np.flatnonzero(librosa.util.localmax(pulse));return librosa.frames_to_time(b,sr=sr),[]
 low=librosa.resample(y,orig_sr=sr,target_sr=11025);path=ROOT/'input.f32';np.asarray(low,dtype='<f4').tofile(path)
 raw=subprocess.check_output(['node',str(ROOT/'baseline.cjs'),str(path)],text=True);return json.loads(raw)['beats'],[]
# Trigger lazy imports/JIT separately so later audio comparisons do not hide that cost.
warm=time.perf_counter();librosa.beat.beat_track(y=np.zeros(22050*2,dtype=np.float32),sr=22050);print('librosa warmup',round(time.perf_counter()-warm,2),flush=True)
for path in sorted((ROOT/'cases').glob('*.wav')):
 y,sr=sf.read(path,dtype='float32');y=y.mean(axis=1) if y.ndim==2 else y
 y=y[:sr*45];meta_path=path.with_suffix('.json');meta=json.loads(meta_path.read_text(encoding='utf-8')) if meta_path.exists() else {'kind':'real_unlabelled','name':path.stem}
 for engine in ['baseline_js','librosa_dp','librosa_plp']+['beat_this_'+k for k in MODELS]:
  start=time.perf_counter();r={'case':path.stem,'kind':meta['kind'],'engine':engine}
  try:
   beats,downbeats=analyze(engine,y,sr);beats=np.asarray(beats,dtype=float);downbeats=np.asarray(downbeats,dtype=float);r.update(seconds=round(time.perf_counter()-start,3),beats=beats.tolist(),downbeats=downbeats.tolist(),count=len(beats),bpm=round(60/np.median(np.diff(beats)),2) if len(beats)>1 else None)
   if 'beats' in meta:r.update(score(meta['beats'],beats));r['downbeat_f1_70ms']=score(meta['downbeats'],downbeats)['f1_70ms'] if len(downbeats) else None
   print(path.stem,engine,'time',r['seconds'],'bpm',r['bpm'],'F1',r.get('f1_70ms'),flush=True)
  except Exception as e:r.update(error=str(e),seconds=round(time.perf_counter()-start,3));print('ERROR',path.stem,engine,str(e),flush=True)
  RESULTS.append(r);(ROOT/'results.json').write_text(json.dumps(RESULTS,indent=2),encoding='utf-8')
print('Saved',len(RESULTS),'runs',flush=True)
