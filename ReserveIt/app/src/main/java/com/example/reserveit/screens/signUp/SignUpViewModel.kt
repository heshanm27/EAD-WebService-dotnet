package com.example.reserveit.screens.signUp

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.dto.auth.SignUpRequestBody
import com.example.reserveit.repo.AuthRepo
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import com.google.gson.Gson
import kotlinx.coroutines.launch

class SignUpViewModel(
    private  val authRepo: AuthRepo,
    private  val context: Context,
) : ViewModel() {
    private val _isLoading = MutableLiveData<Boolean>()
    private val _error = MutableLiveData<String>()
    val error: MutableLiveData<String>
        get() = _error
    val isLoading: MutableLiveData<Boolean>
        get() = _isLoading


    init {
        SharedPreferenceService.initialize(context)
    }
    fun signUp(signup: SignUpRequestBody) {
        viewModelScope.launch {
            try{
                _isLoading.value = true
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

                        }
                    }
                }
            }catch (e: Exception){

                _error.value = e.message

            }finally {

                _isLoading.value = false
            }

        }
        }

}