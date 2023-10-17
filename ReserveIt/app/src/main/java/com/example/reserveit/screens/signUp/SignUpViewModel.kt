package com.example.reserveit.screens.signUp

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.dto.auth.SignUpRequestBody
import com.example.reserveit.models.login.LoginModel
import com.example.reserveit.repo.AuthRepo
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import kotlinx.coroutines.launch

class SignUpViewModel(
    private  val authRepo: AuthRepo,
    private  val context: Context,
) : ViewModel() {
    private val _isLoading = MutableLiveData<Boolean>()

    private  val _loginResponse = MutableLiveData<LoginModel?>()

    val isLoading: MutableLiveData<Boolean>
        get() = _isLoading

    val loginResponse: MutableLiveData<LoginModel?>
        get() = _loginResponse


    init {
        SharedPreferenceService.initialize(context)
    }
    fun signUp(signup: SignUpRequestBody) {
        viewModelScope.launch {
            try{
                _isLoading.value = true
                Log.d("gg viewModel", signup.firstName)
               var response =  authRepo.register(signup)
                // Handle the response here
                if (response.isSuccessful) {
                    // Handle successful response
                    val data = response.body()
                    if (data != null) {
                        if (data.status === true) {
                            SharedPreferenceService.saveValue(
                                AppConstants.TOKEN_KEY,
                                data.data?.token ?: ""
                            )
                            //convert data to json
                            val gson = Gson()
                            val json = gson.toJson(data)
                            SharedPreferenceService.saveValue(AppConstants.USER_DATA, json)
                            _loginResponse.value = data
                        }
                    }
                }else{
                    val gson = Gson()
                    val type = object : TypeToken<LoginModel>() {}.type
                    var errorResponse: LoginModel? = gson.fromJson<LoginModel>(response.errorBody()!!.charStream(), type)
                    Log.d("vloginViewmidel", errorResponse.toString())// AerrorBodyccess the error body here
                    if(errorResponse != null){
                        _loginResponse.value = errorResponse
                    }
                }
            }catch (e: Exception){


            }finally {

                _isLoading.value = false
            }

        }
        }

}