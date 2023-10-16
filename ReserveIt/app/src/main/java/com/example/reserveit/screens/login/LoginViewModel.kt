package com.example.reserveit.screens.login

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.models.login.LoginModel
import com.example.reserveit.repo.AuthRepo
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import com.google.gson.Gson
import kotlinx.coroutines.launch


class LoginViewModel(
    private  val authRepo: AuthRepo,
    private  val context: Context,
) : ViewModel() {


    private val _isLoading = MutableLiveData<Boolean>()
    private  val _loginResponse = MutableLiveData<LoginModel?>()
    val isLoading: LiveData<Boolean>
        get() = _isLoading

    val loginResponse: MutableLiveData<LoginModel?>
        get() = _loginResponse
    // Initialize SharedPreferenceService in the init block
    init {
        SharedPreferenceService.initialize(context)
    }

     fun login(loginRequestBody: LoginRequestBody) {
         Log.d("gg viewModel", loginRequestBody.email)
         Log.d("gg viewModel", loginRequestBody.password)
        viewModelScope.launch {
            try {
                _isLoading.value = true
                // Call the suspend function from your repository or Retrofit interface
                val response = authRepo.login(loginRequestBody)

                // Handle the response here
                if (response.isSuccessful) {
                    // Handle successful response
                    val data = response.body()


                    if (data != null) {
                        if(data.status === true) {
                            SharedPreferenceService.saveValue(
                                AppConstants.TOKEN_KEY,
                                data.data?.token ?: ""
                            )
                            SharedPreferenceService.saveObject(AppConstants.USER_DATA, data)
                            _loginResponse.value = data
                        }
                    }
                } else {
                    // Handle error response
                    val errorBody = response.errorBody() // Access the error body here
                    Log.d("ggview errorBodyinside", errorBody.toString())
                }
            } catch (e: Exception) {
                // Handle network errors or other exceptions here
                e.printStackTrace()
                Log.d("ggview onexception", e.toString())
            }finally {
                _isLoading.value = false
            }
        }
    }

        fun textChanged() {
            Log.d("LOGD", "textChanged")
        }

}