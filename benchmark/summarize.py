from pathlib import Path
import json,statistics
import numpy as np
import mir_eval
ROOT=Path(__file__).resolve().parent
runs=json.loads((ROOT/'results.json').read_text())
original=list(runs)
for model in ['small0','final0']:
 for case in sorted(set(r['case'] for r in original)):
  pair={r['engine']:r for r in original if r['case']==case};plp=pair['librosa_plp'];other=pair['beat_this_'+model];beats=np.array(plp['beats']);db=sorted(set(float(beats[np.argmin(abs(beats-t))]) for t in other['downbeats'] if len(beats) and np.min(abs(beats-t))<=.12))
  r={**plp,'engine':'hybrid_plp_'+model,'downbeats':db,'seconds':plp['seconds']+other['seconds'],'timing':'sum_of_component_runs'}
  meta=ROOT/'cases'/(case+'.json')
  if meta.exists():r['downbeat_f1_70ms']=float(mir_eval.beat.f_measure(np.array(json.loads(meta.read_text())['downbeats']),np.array(db),f_measure_threshold=.07)) if db else 0.
  runs.append(r)
(ROOT/'results-with-hybrid.json').write_text(json.dumps(runs,indent=2))
summary=[]
for engine in sorted(set(r['engine'] for r in runs)):
 rs=[r for r in runs if r['engine']==engine and 'error' not in r];labelled=[r for r in rs if 'f1_70ms' in r];db=[r['downbeat_f1_70ms'] for r in labelled if r.get('downbeat_f1_70ms') is not None]
 item={'engine':engine,'mean_f1_70ms_synthetic':statistics.mean(r['f1_70ms'] for r in labelled),'mean_downbeat_f1_70ms_synthetic':statistics.mean(db) if db else None,'median_seconds':statistics.median(r['seconds'] for r in rs),'runs':len(rs)};summary.append(item);print(json.dumps(item),flush=True)
(ROOT/'summary.json').write_text(json.dumps(summary,indent=2))
