import GUI from 'lil-gui';
import { AnimationAction, AnimationActionLoopStyles, AnimationClip, LoopOnce, LoopPingPong, LoopRepeat } from 'three';

export function addClipActionFolder(folderName: string, gui: GUI, clipAction: AnimationAction, animationClip: AnimationClip) {
  const actionControls = {
    keyframe: 0,
    time: 0,
    timeScale: 1,
    repetitions: Infinity,
    warpStartTimeScale: 1,
    warpEndTimeScale: 1,
    warpDurationInSeconds: 2,
    warp: function () {
      clipAction.warp(
        actionControls.warpStartTimeScale,
        actionControls.warpEndTimeScale,
        actionControls.warpDurationInSeconds
      );
    },
    fadeDurationInSeconds: 2,
    fadeIn: function () {
      clipAction.fadeIn(actionControls.fadeDurationInSeconds);
    },
    fadeOut: function () {
      clipAction.fadeOut(actionControls.fadeDurationInSeconds);
    },
    effectiveWeight: 0,
    effectiveTimeScale: 0,
  };
  const actionFolder = gui.addFolder(folderName)
    actionFolder.add(clipAction, "clampWhenFinished").listen();
    actionFolder.add(clipAction, "enabled").listen();
    actionFolder.add(clipAction, "paused").listen();
    actionFolder.add(clipAction, "loop", { LoopRepeat: LoopRepeat, LoopOnce: LoopOnce, LoopPingPong: LoopPingPong }).onChange(function(e: AnimationActionLoopStyles) {
      if (e == LoopOnce || e == LoopPingPong) {
        clipAction.reset();
        clipAction.repetitions = 0
        clipAction.setLoop(e, 0);
      } else {
        clipAction.setLoop(e, actionControls.repetitions);
      }
    });
    actionFolder.add(actionControls, "repetitions", 0, 100).listen().onChange(function(e: number) {
      if (clipAction.loop == LoopOnce || clipAction.loop == LoopPingPong) {
        clipAction.reset();
        clipAction.repetitions = 0
        clipAction.setLoop(clipAction.loop, 0);
      } else {
        clipAction.setLoop(clipAction.loop, actionControls.repetitions);
      }
    });
    actionFolder.add(clipAction, "time", 0, animationClip.duration, 0.001).listen()
    actionFolder.add(clipAction, "timeScale", 0, 5, 0.1).listen()
    actionFolder.add(clipAction, "weight", 0, 1, 0.01).listen()
    actionFolder.add(actionControls, "effectiveWeight", 0, 1, 0.01).listen()
    actionFolder.add(actionControls, "effectiveTimeScale", 0, 5, 0.01).listen()
    actionFolder.add(clipAction, "zeroSlopeAtEnd").listen()
    actionFolder.add(clipAction, "zeroSlopeAtStart").listen()
    actionFolder.add(clipAction, "stop")
    actionFolder.add(clipAction, "play")
    actionFolder.add(clipAction, "reset")
    actionFolder.add(actionControls, "warpStartTimeScale", 0, 10, 0.01)
    actionFolder.add(actionControls, "warpEndTimeScale", 0, 10, 0.01)
    actionFolder.add(actionControls, "warpDurationInSeconds", 0, 10, 0.01)
    actionFolder.add(actionControls, "warp")
    actionFolder.add(actionControls, "fadeDurationInSeconds", 0, 10, 0.01)
    actionFolder.add(actionControls, "fadeIn")
    actionFolder.add(actionControls, "fadeOut")

    return actionControls;
}
