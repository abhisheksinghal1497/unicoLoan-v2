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
import android.util.Log;

import com.salesforce.androidsdk.reactnative.app.SalesforceReactSDKManager;
import com.salesforce.androidsdk.reactnative.ui.SalesforceReactActivity;

import android.os.Bundle;
import androidx.fragment.app.FragmentManager;

public class MainActivity extends SalesforceReactActivity {

	public FragmentManager fragmentManager;



	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		fragmentManager = getSupportFragmentManager();

		Log.d("Biometricstatus", "Biometric opted in status: " + SalesforceReactSDKManager.getInstance()
                 .getBiometricAuthenticationManager().isEnabled() );
		Log.d("Biometricstatus", "Biometric opted in status: " + SalesforceReactSDKManager.getInstance()
				.getBiometricAuthenticationManager()
				.hasBiometricOptedIn() );

        SalesforceReactSDKManager.getInstance()
                .getBiometricAuthenticationManager().biometricOptIn(true);
		presentBiometricOptInDialog();
        enableBiometricLoginButton();
//        enableBiometricLoginButton();
//        SalesforceReactSDKManager.getInstance().getBiometricAuthenticationManager().enableNativeBiometricLoginButton(true);
		// Check if biometric authentication is already opted in
//		boolean biometricOptedIn = checkBiometricOptedIn();

		


		// Call the method to present the opt-in dialog or enable the biometric login button
//		if (!biometricOptedIn) {
//			presentBiometricOptInDialog();
//		} else {
//			enableBiometricLoginButton();
//		}
//
	// Call the method to present the opt-in dialog if needed
	}

	@Override
	public void onResume() {
		super.onResume();

		// Check and log biometric enabled status in onResume
		Log.d("Biometricstatus", "Biometric enabled status in onResume: " +
				SalesforceReactSDKManager.getInstance().getBiometricAuthenticationManager().isEnabled());
	}

	/**
	 * Checks if biometric authentication is already opted in.
	 * @return True if opted in, false otherwise.
	 */
	private boolean checkBiometricOptedIn() {
		return SalesforceReactSDKManager.getInstance()
				.getBiometricAuthenticationManager()
				.hasBiometricOptedIn();
	}

	/**
	 * Presents the biometric authentication opt-in dialog.
	 */
	private void presentBiometricOptInDialog() {
		SalesforceReactSDKManager.getInstance()
				.getBiometricAuthenticationManager()
				.presentOptInDialog(fragmentManager);
	}

	/**
	 * Enables the native biometric login button.
	 */
	private void enableBiometricLoginButton() {
		SalesforceReactSDKManager.getInstance()
				.getBiometricAuthenticationManager()
				.enableNativeBiometricLoginButton(true);
	}



	/**
	 * Override to control whether login should happen when the application launches.
	 *
	 * @return true if you want login to happen, false otherwise
	 */

	@Override
	public boolean shouldAuthenticate() {
		return false;
	}

	/**
	 * Returns the name of the main component registered from JavaScript.
	 * This is used to schedule rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "unicoLoan";
	}
}

