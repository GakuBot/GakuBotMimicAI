//https://github.com/appfeel/admob-phonegap-build-demo

function onDeviceReady() {
  if(typeof admob === "undefined" || !admob){
    return
  }

  if(typeof resizeDraw !== "undefined"){
    document.addEventListener(admob.events.onAdLoaded, function(){
      resizeDraw.resize()
    });
    
    document.addEventListener(admob.events.onAdFailedToLoad, function(){
      resizeDraw.resize()
    });
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
