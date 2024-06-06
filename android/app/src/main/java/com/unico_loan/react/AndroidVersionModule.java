package com.unico_loan.react;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AndroidVersionModule extends ReactContextBaseJavaModule {


    public AndroidVersionModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @ReactMethod
    public void createCalendarEvent(String name, Callback callBack) {
        Log.d("Adnan>>>>>",name );
        callBack.invoke(name);
    }
    @NonNull
    @Override
    public String getName() {
        return "AndroidVersionModule";
    }
}
