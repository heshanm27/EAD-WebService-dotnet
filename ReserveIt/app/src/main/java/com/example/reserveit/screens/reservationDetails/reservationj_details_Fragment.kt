package com.example.reserveit.screens.reservationDetails

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.reserveit.R

class reservationj_details_Fragment : Fragment() {

    companion object {
        fun newInstance() = reservationj_details_Fragment()
    }

    private lateinit var viewModel: ReservationjDetailsViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_reservationj_details_, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(ReservationjDetailsViewModel::class.java)
        // TODO: Use the ViewModel
    }

}