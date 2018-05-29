//https://github.com/appfeel/admob-phonegap-build-demo

function onDeviceReady() {
  if(typeof admob === "undefined" || !admob){
    return
  }

  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  admob.setOptions({
    publisherId: "ca-app-pub-8785449904139661/1465323866",
    isTesting: false,
    autoShowBanner: true,
    bannerAtTop: true
  });

  // Start showing banners (atomatic when autoShowBanner is set to true)
  admob.createBannerView();
}

document.addEventListener("deviceready", onDeviceReady, false);