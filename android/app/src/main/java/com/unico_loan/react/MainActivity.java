/*
 * Copyright (c) 2015-present, salesforce.com, inc.
 * All rights reserved.
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 * - Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * - Neither the name of salesforce.com, inc. nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission of salesforce.com, inc.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
package com.unico_loan.react;

import com.salesforce.androidsdk.reactnative.app.SalesforceReactSDKManager;
import com.salesforce.androidsdk.reactnative.ui.SalesforceReactActivity;

import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;

import androidx.fragment.app.FragmentManager;

public class MainActivity extends SalesforceReactActivity {

	// public FragmentManager fragmentManager;



	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Initialize fragmentManager

		boolean isDevEnabled = isDevelopmentSettingsMode();
		if(isDevEnabled){

		}
		
	}

	@Override
	public void onResume() {
		super.onResume();
	}

	// /**
	//  * Determines if biometric authentication opt-in dialog needs to be presented.
	//  */
	// private void presentBiometricOptInDialog() {
	// 	SalesforceReactSDKManager.getInstance()
	// 			.getBiometricAuthenticationManager()
	// 			.presentOptInDialog(fragmentManager);
	// }

	/**
	 * Override to control whether login should happen when the application launches.
	 *
	 * @return true if you want login to happen, false otherwise
	 */

	@Override
	public boolean shouldAuthenticate() {
		return true;
	}

	/**
	 * Returns the name of the main component registered from JavaScript.
	 * This is used to schedule rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "unicoLoan";
	}

	private boolean isDevelopmentSettingsMode(){
		boolean isDevelopmentSettingsMode;
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
			isDevelopmentSettingsMode = Settings.System.getInt(this.getContentResolver(), Settings.Secure.DEVELOPMENT_SETTINGS_ENABLED, 0) != 1;
		} else {
			isDevelopmentSettingsMode = Settings.Global.getInt(this.getContentResolver(), Settings.Global.DEVELOPMENT_SETTINGS_ENABLED, 0) == 1;
		}
	return  isDevelopmentSettingsMode;
	}


}

