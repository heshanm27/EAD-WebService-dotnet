package com.example.reserveit.screens.resrevation

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.models.booked.Booked
import com.example.reserveit.models.booked.BookedData
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.repo.ReservationRepo
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
                 _isLoading.value = true
                 _isError.value =false
                 val userId = "65238be46b014b079674d9a7"
                 val response = reservation.getUpcomingReservations(id = userId)
                 if (response.isSuccessful) {
                     val response = response.body()
                     if (response != null) {
                         if (response.status) {
                             _bookedDataList.value = response.data
                         }
                     }
                 }
             }catch (e: Exception){
                    e.printStackTrace()
                _isError.value = true
             }finally {
                    _isLoading.value = false
             }
         }

     }

}