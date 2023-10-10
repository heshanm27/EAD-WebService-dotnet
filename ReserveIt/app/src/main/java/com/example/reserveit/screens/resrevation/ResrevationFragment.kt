package com.example.reserveit.screens.resrevation

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.example.reserveit.adapters.ReservationAdapter
import com.example.reserveit.databinding.FragmentResrevationBinding


import com.example.reserveit.models.reservation.Reservation


class ResrevationFragment : Fragment() {

    private var binding : FragmentResrevationBinding?= null

    private lateinit var viewModel: ResrevationViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentResrevationBinding.inflate(inflater, container, false)

        viewModel = ViewModelProvider(this).get(ResrevationViewModel::class.java)

        val recyclerView = binding!!.reservationRecyclerView
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = androidx.recyclerview.widget.LinearLayoutManager(context)
        viewModel.addReservation(Reservation("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"))

        val list = viewModel.reservationList
        val adapter = ReservationAdapter(list)
        recyclerView.adapter = adapter
        return binding?.root;
    }



}