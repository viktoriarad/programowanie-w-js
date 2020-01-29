// Inicjalizacja objektu DOM
const oDOM = DOM();

// Inicjalizacja objektu Device
const oDevice = Device();

// Inicjalizacja objektu Game
const oGame = Game(oDevice.getDefaultSize(), 10);

// Inicjalizacja objektu Canvas
const oCanvas = Canvas(oDOM.getCanvas(), oDOM.getCtx());

oDOM.setDeviceSizeGetter(oDevice.getDefaultSize);
oDOM.setPauseGameHandler(oGame.pause);
oDOM.setResumeGameHandler(oGame.resume);
oDOM.setAPIPermissionGetter(oDevice.requestSensorsPermission);
oDOM.setStartGameHandler(oGame.start);
oDOM.setRenderer(oCanvas.render);
oDOM.setIsGameStartedGetter(oGame.isStarted);
oDOM.setIsGamePausedGetter(oGame.isPaused);
oDOM.setIsGameOvered(oGame.isGameOvered);
oDOM.setIsWin(oGame.isWin);
oDOM.setCurrentLevelGetter(oGame.getCurrentLevel);
oDOM.setMoveBallBy(oGame.moveBallBy);
oDOM.setLandscapeModeChecker(oDevice.isLandscape);
oDOM.setPortraitModeChecker(oDevice.isPortrait);
oDOM.setOrientationModeGetter(oDevice.getOrientation);

oDevice.setGrantedPermissionAction(oDOM.startGameButtonHandler);

oGame.setOrientationGetter(oDevice.getOrientation);

oCanvas.setBallGetter(oGame.getBall);
oCanvas.setIsGameStartedGetter(oGame.isStarted);
oCanvas.setHolesGetter(oGame.getHoles);

/**
 * API sensorow jest dostepne tylko przez zabiezpieczony protokol HTTPS.
 * Funkcja sprawdza protokol i przekierowuje do niego.
 */
const changeProtocolToHTTP = () => {
  if (location.protocol !== 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
};

changeProtocolToHTTP();
