package com.example.reserveit.screens.home


import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.models.train_schedule.TrainData
import com.example.reserveit.models.train_schedule.TrainScheduleModel
import com.example.reserveit.repo.TrainScheduleRepo
import kotlinx.coroutines.launch

class HomeViewModel(
    private val trainSchedule: TrainScheduleRepo
): ViewModel() {

    private  val _trainScheduleList = MutableLiveData<List<TrainData>>()
    private val _isLoading = MutableLiveData<Boolean>()


    val trainScheduleList: MutableLiveData<List<TrainData>>
        get() = _trainScheduleList

    val isLoading: MutableLiveData<Boolean>
        get() = _isLoading


     fun getTrainSchedule(
        page: Int = 1,
        pageSize: Int = 10,
        order: String = "asc",
        end : String = "",
        start : String = "",
        date : String = ""
    ){
        viewModelScope.launch {

            try {
                _isLoading.value = true
                val response = trainSchedule.getTrainSchedules(
                    page,
                    pageSize,
                    order,
                    end,
                    start,
                    date
                )
                if (response.isSuccessful) {
                    val data = response.body()
//                    _trainScheduleList.clear()
//                    data?.get(0)?.data?.get(0)?.let { Log.d("gg", it.trainName) }
                    if (data != null) {
                        _trainScheduleList.value = data.data
                    }


                }
            } catch (e: Exception) {
                e.printStackTrace()
            }finally {
                _isLoading.value = false
            }

        }


    }





}