package com.demo;

import android.content.DialogInterface;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.EditText;

import androidx.appcompat.app.AlertDialog;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Demo";
  }

  @Override
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    Log.d("KeyEvent", keyCode + "------------" + event.toString());
    if(keyCode == KeyEvent.KEYCODE_ENTER){
      final EditText inputServer = new EditText(this);
      AlertDialog.Builder builder = new AlertDialog.Builder(this);
      builder.setTitle("输入扫描码").setIcon(android.R.drawable.ic_dialog_info).setView(inputServer)
              .setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                  dialog.dismiss();
                }
              });
      builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int which) {
          String text = inputServer.getText().toString();
          sendEventToRn("scanData",text);
        }
      });
      builder.show();
    }
    if(keyCode == KeyEvent.KEYCODE_BUTTON_L1){
      try {
        String keyCommand = "input keyevent " + KeyEvent.KEYCODE_MENU;
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(keyCommand);
      }
      catch (Exception e) {
        e.printStackTrace();
      }
    }
    return super.onKeyUp(keyCode, event);
  }

  /**
   * 发送广播到RN
   * @param eventName
   * @param params
   */
  public void sendEventToRn(String eventName, @Nullable String params){
    //这里的模块中context已经获取
    getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }
}
