package com.pigzbeapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.oblador.keychain.KeychainPackage;
import com.imagepicker.ImagePickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import org.reactnative.camera.RNCameraPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
          new RCTPdfView(),
          new RNFetchBlobPackage(),
          new RNDeviceInfo(),
          new RNBackgroundFetchPackage(),
          new BackgroundTaskPackage(),
          new FingerprintAuthPackage(),
          new KeychainPackage(),
          new ImagePickerPackage(),
          new ReactNativeConfigPackage(),
          new RNCameraPackage(),
          new RandomBytesPackage()
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
    BackgroundTaskPackage.useContext(this);
  }
}
