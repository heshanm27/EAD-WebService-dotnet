package com.example.reserveit.screens.login

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.repo.AuthRepo
import kotlinx.coroutines.launch


class LoginViewModel(
    private  val authRepo: AuthRepo
) : ViewModel() {



     fun login(loginRequestBody: LoginRequestBody) {
         Log.d("gg viewModel", loginRequestBody.email)
         Log.d("gg viewModel", loginRequestBody.password)
        viewModelScope.launch {
            try {
                // Call the suspend function from your repository or Retrofit interface
                val response = authRepo.login(loginRequestBody)

                // Handle the response here
                if (response.isSuccessful) {
                    // Handle successful response
                    val data = response.body()
                    if (data != null) {

                        // Print the response body to the terminal
                        println("token: ${data?.message}")
                        println("token: ${data?.data?.token}")
                        println("token: ${data?.data?.firstName}")
                        println("token: ${data?.data?.lastName}")
                        println("token: ${data?.data?.avatarURL}")
                        println("token: ${data?.data?.role}")


                        // or use Log for Android applications
                        // Log.d("ggx", data.toString())
                    } else {
                        println("Response body is null")
                    }
                } else {
                    // Handle error response
                    val errorBody = response.errorBody() // Access the error body here
                    Log.d("errorBody", errorBody.toString())
                }
            } catch (e: Exception) {
                // Handle network errors or other exceptions here
                e.printStackTrace()
            }
        }
    }

        fun textChanged() {
            Log.d("LOGD", "textChanged")
        }

}