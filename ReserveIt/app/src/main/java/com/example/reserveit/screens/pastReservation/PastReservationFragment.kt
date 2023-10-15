package com.example.reserveit.screens.pastReservation

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.reserveit.R

class PastReservationFragment : Fragment() {

    companion object {
        fun newInstance() = PastReservationFragment()
    }

    private lateinit var viewModel: PastReservationViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_past_reservation, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(PastReservationViewModel::class.java)
        // TODO: Use the ViewModel
    }

}