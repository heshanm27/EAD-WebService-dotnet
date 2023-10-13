package com.example.reserveit.screens.reservationDetails

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentReservationDetailsBinding

/*
* File: ReservationDetailsFragment.kt
* Author:
* Description: This class is used to display reservation details.
* */

class ReservationDetailsFragment : Fragment() {

    private var binding :FragmentReservationDetailsBinding? = null
    private lateinit var viewModel: ReservationDetailsViewModel
    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
        val noSeats = resources.getStringArray(R.array.no_seats)
        val arradapter = context?.let { ArrayAdapter(it, R.layout.dropdown_item, noSeats) }
        binding!!.noSeats.setAdapter(arradapter)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        binding = FragmentReservationDetailsBinding.inflate(inflater, container, false)
      (activity as MainActivity?)!!.hideBottomNavigationView()

        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
        }
        binding?.checkOutAction?.setOnClickListener {

        }

//        binding?.cancelAction?.setOnClickListener {
//            // pop back to the main fragment
//            findNavController().popBackStack()
//        }

        return binding?.root
    }


    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }
}