package com.botler;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.wmjmc.reactspeech.VoicePackage; // voice recognition package
import net.no_mad.tts.TextToSpeechPackage; // test to speech package
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage; // push notification
import com.devfd.RNGeocoder.RNGeocoderPackage; // geocoder

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VoicePackage(), // voice recognition package
          new TextToSpeechPackage(), // test to speech package
          new ReactNativePushNotificationPackage(), // push notification
          new RNGeocoderPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
