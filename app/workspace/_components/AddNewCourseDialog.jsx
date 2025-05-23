import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'



function AddNewCourseDialog({children}) {
const [formData, setFormData] = useState({
  name: "",
  description: "",
 
  includeVideo: false,
   noOfChapters: 1,
   catcegory: "",
  Level: "",
});

const onHandleInputChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
  console.log("Form Data", formData);
}

const onGenerate = () => {
  console.log("Form Data", formData);
}
  

  return (
    <Dialog>
  <DialogTrigger asChild >{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course Using AI</DialogTitle>
      <DialogDescription asChild>
        <div className="flex flex-col gap-3 mt-3">
         
          <div className="flex flex-col ">
             
            <label className='text-bold '>Course Name</label>
            <Input placeholder='Course Name' onChange={(event)=> onHandleInputChange('courseName', event?.target.value)} />
        
          </div>
          <div className="flex flex-col ">
             
            <label className='text-bold'> Course Description (Optional)</label>
            <Textarea placeholder='Course Description ' onChange={(event)=> onHandleInputChange('description', event?.target.value)}/>
        
          </div>

           <div className="flex flex-col ">
             
            <label className='text-bold '>No. Of Chapters </label>
            <Input placeholder='No. Of Chapters' type='number' 
            onChange={(event)=> onHandleInputChange('noOfChapters', event?.target.value)}/>
        
          </div>
          <div>
            <label className='text-bold flex-gap items-center'>Include Video </label>

              <Switch className={"ml-2"}
               onCheckedChange={() => onHandleInputChange('includeVideo',!formData?.includeVideo)}  />
                    
          </div>
          <div>
            <label className='text-bold flex-gap items-center'>Difficulty Level </label>
              
                    <Select className="w-full" onValueChange={(value) => onHandleInputChange('Level', value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Difficulty Level " />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Beginner">Beginner</SelectItem>
    <SelectItem value="Moderate">Moderate </SelectItem>
    <SelectItem value="Advance">Advance </SelectItem>
  </SelectContent>
</Select>

          </div>
                    <div className="flex flex-col ">
             
            <label className='text-bold '>Category </label>
            <Input placeholder='Category {Eg:- Maths, Programming, Science etc }'  
            onChange={(event)=> onHandleInputChange('category', event?.target.value)}/>
        
          </div>
            <div className="mt-5 flex flex-col ">
                 <Button className={'w-full'} onClick={onGenerate}> <Sparkle /> Generate Course </Button></div>
      
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default AddNewCourseDialog