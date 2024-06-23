import { Component } from '@angular/core';
import { Appointment } from '../Models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  ngOnInit(): void {
    let lsData = localStorage.getItem("appointments");
    this.appointments = lsData? JSON.parse(lsData) : [];      
  }

  appointmentName: string = "";
  date: Date = new Date();

  appointments: Appointment[] = [];

  onClick() {
    if (this.appointmentName.trim().length != 0 && this.date) {
      let new_app: Appointment = {
        id : Date.now(),
        title : this.appointmentName,
        date : this.date
      }
      this.appointments.push(new_app);
      this.appointmentName = "";

      this.appointments.sort((a: Appointment, b: Appointment) => {
        let d1: Date = new Date(a.date);
        let d2: Date = new Date(b.date);
        if (d1 < d2) return -1;
        if (d1 > d2) return 1;
        return 0;
      });

      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number)
  {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}