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
import { LoaderPinwheelIcon, Sparkle } from 'lucide-react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'



function AddNewCourseDialog({children}) {

  const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  description: "",
 
  includeVideo: false,
   noOfChapters: 1,
   catcegory: "",
  Level: "",
});

const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  
}

const onGenerate = async () => {
  console.log(formData);
  const courseId = uuidv4();
  try {
  setLoading(true);
  const result = await axios.post('/api/generate-course-layout', {
    ...formData,
    courseId:courseId,
  });
  console.log(result.data);
  setLoading(false);
  router.push('/workspace/edit-course/'+result.data?.courseId);
}
  catch (e) {
    setLoading(false);
    console.log(e);
    
  }
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
              
                    <Select className="w-full" onValueChange={(value) => onHandleInputChange('level', value)}>
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
                 <Button className={'w-full'} onClick={onGenerate} disabled={loading} > 
                  {loading?<LoaderPinwheelIcon className='animate-spin' />:
                  <Sparkle />} Generate Course </Button></div>
      
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default AddNewCourseDialog