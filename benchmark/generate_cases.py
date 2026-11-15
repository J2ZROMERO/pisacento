from pathlib import Path
import json, math
import numpy as np
import soundfile as sf
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'cases';OUT.mkdir(exist_ok=True)
sr=22050
rng=np.random.default_rng(20261018)
def make(name,bpm=160,variable=False,cut=False,click=False):
 duration=36.0;y=np.zeros(int(sr*duration),dtype=np.float32);beats=[];t=.25
 while t<duration-.4:
  beats.append(t);t+=60/(150+24*t/duration if variable else bpm)
 def tone(at,freq,amp=.2,length=.12,noise=False):
  start=int(at*sr);n=min(int(length*sr),len(y)-start)
  if n<=0 or start<0:return
  ts=np.arange(n)/sr;wave=rng.standard_normal(n) if noise else np.sin(2*np.pi*freq*ts)
  y[start:start+n]+=amp*wave*np.exp(-ts/(length/5))
 for i,t in enumerate(beats):
  interval=beats[i+1]-t if i+1<len(beats) else 60/bpm
  if click:
   tone(t,1400 if i%4==0 else 800,.65,.045);continue
  # Salsa-like rhythmic mixture. Ground truth is the composition timeline,
  # not an annotation of a commercial recording.
  tone(t,3200,.035,.045,True)
  if i%2==0:tone(t,810,.18,.1);tone(t,1320,.05,.07)
  if i%4==1:tone(t,180,.23,.09)
  if i%4==3:
   tone(t,240,.22,.12);tone(t+interval*.5,220,.18,.12)
  if i%4 in (1,3):tone(t+(.5*interval if i%4==1 else 0),82.41,.28,.24)
  if i%8 in (1,2,4,7):tone(t,1700,.08,.035)
  if i%8==5:tone(t+.5*interval,1700,.08,.035)
  for frac in ([0,.5] if i%4 in (0,3) else [.5]):
   for f in [261.63,329.63,392]:tone(t+frac*interval,f,.055,.19)
  if i%4==0:
   tone(t,65.4,.16,.16)
   for f in [261.63,329.63,392]:tone(t,f,.12,.25)
  if i>16 and i%2==0:tone(t+.18*interval,[392,440,493.9,523.25][(i//2)%4],.06,.35)
 if cut:y[int(12*sr):int(15*sr)]=0
 y/=max(1,np.max(np.abs(y))*1.05)
 sf.write(OUT/(name+'.wav'),y,sr)
 (OUT/(name+'.json')).write_text(json.dumps({'name':name,'beats':beats,'downbeats':beats[::4],'kind':'synthetic','tempo':bpm,'variable':variable,'cut':cut}),encoding='utf-8')
for args in [('click_120',120,False,False,True),('salsa_like_160',160,False,False,False),('salsa_like_180',180,False,False,False),('salsa_like_ramp',162,True,False,False),('salsa_like_cut',160,False,True,False)]:make(*args)
print('Generated 5 labelled synthetic cases (not real salsa recordings).')
