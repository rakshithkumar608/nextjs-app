import { Column, JobApplication } from "@/lib/models/models.types"

interface JobApplicationCardProps {
    job: JobApplication;
    columns: Column[];
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}


export default function JobApplicationCard({job, columns, dragHandleProps}: JobApplicationCardProps) {
    return (
     <div>

     </div>
    )
}