package com.example.reserveit.screens.resrevation

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.models.booked.Booked
import com.example.reserveit.models.booked.BookedData
import com.example.reserveit.models.login.LoginModel
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.repo.ReservationRepo
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import kotlinx.coroutines.launch


class ResrevationViewModel(
    private val reservation: ReservationRepo,
    private val context: Context
) : ViewModel() {


    private val  _bookedDataList = MutableLiveData<List<BookedData>>()
    private val _isLoading = MutableLiveData<Boolean>()
    private val _isError = MutableLiveData<Boolean>()


     val bookedDataList: MutableLiveData<List<BookedData>>
        get() = _bookedDataList

    val isLoading: MutableLiveData<Boolean>
        get() = _isLoading

    val isError: MutableLiveData<Boolean>
        get() = _isError

     fun getUpcomingReservations(){
         viewModelScope.launch {
             try {
                 SharedPreferenceService.initialize(context)
                 val sharedPreferences =  SharedPreferenceService.loadObject(AppConstants.USER_DATA, LoginModel::class.java)

                 _isLoading.value = true
                 _isError.value =false
                 if (sharedPreferences != null && sharedPreferences is LoginModel) {

                     if(sharedPreferences.data != null){
                         val userId = sharedPreferences.data.userId
                         Log.d("userId", userId)
                         val response = reservation.getUpcomingReservations(id = userId)
                         if (response.isSuccessful) {
                             val response = response.body()
                             if (response != null) {
                                 if (response.status) {
                                     _bookedDataList.value = response.data
                                 }
                             }
                         }
                     }}

             }catch (e: Exception){
                    e.printStackTrace()
                _isError.value = true
             }finally {
                    _isLoading.value = false
             }
         }

     }

}