package com.example.reserveit.screens.reservationDetails

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentReservationDetailsBinding


class reservation_details_Fragment : Fragment() {

    private var binding :FragmentReservationDetailsBinding? = null
    private lateinit var viewModel: ReservationDetailsViewModel
    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        binding = FragmentReservationDetailsBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()


        binding?.bookAction?.setOnClickListener {
            findNavController().navigate(R.id.action_reservation_details_Fragment_to_addReservation)
        }

        binding?.cancelAction?.setOnClickListener {
            // pop back to the main fragment
            findNavController().popBackStack()
        }

        return binding?.root
    }


    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }
}