import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { NoticesService } from '../shared/notices.service';
import { Notices } from '../shared/notices.model';
import { NONE_TYPE } from '@angular/compiler';

declare var M: any
@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
  providers:[NoticesService]
})
export class NoticesComponent implements OnInit {

  constructor(public noticesService: NoticesService) { }

  ngOnInit(){
    this.resetForm()
    this.refershNoticesList()
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.noticesService.postNotice(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refershNoticesList();
        M.toast( {html: "Saved successfully", classes: 'rounded'});
      })
    }
    else{
      this.noticesService.putNotice(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refershNoticesList();
        M.toast( {html: "Updated successfully", classes: 'rounded'});
      })
    }

  }
  resetForm(form?: NgForm){
    if(form)
      form.reset()
    this.noticesService.selectedNotice = {
      _id: "",
      note: "",
      timeStamp: new Date
    }
  }

  refershNoticesList(){
    this.noticesService.getNoticesList().subscribe((res) => {
      this.noticesService.notices = res as Notices[];
    })
  }

  onEdit(notice: Notices){
    //M.toast({html : "Clicked on Edit", classes: "rounded"})
    this.noticesService.selectedNotice = notice;
  }
  onDelete(_id: string, form:NgForm){
    //console.log("Clicked on Delete")
    //M.toast({html : "Clicked on Delete", classes: "rounded"})
    if (confirm('Are you sure to delete this record ?') == true){
      this.noticesService.deletNotice(_id).subscribe((res) => {
        this.refershNoticesList();
        this.resetForm(form);
        M.toast({html : "Deleted successfully", classes: 'rounded'});
      })
    }
  }
}
