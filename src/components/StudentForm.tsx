import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { z } from "zod"


const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 letters").max(10),
    age: z.number({ invalid_type_error: "Age is requiered" }).min(18),
    id: z.string().min(5).max(10)
})

type FormData = z.infer<typeof schema>

function StudentForm() {
    console.log('StudentForm')
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = (data: FieldValues) => {
        console.log('onsubmit', data)
    }
    return (
        <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">ID:</label>
                <input
                    type="text"
                    id="id"
                    className="form-control"
                    {...register('id', { required: true, minLength: 5, maxLength: 10 })}
                />
                {errors.id && <div className="text-danger">{errors.id.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    {...register('name', { required: true, minLength: 3 })} />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}

            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <input
                    type="number"
                    id="age"
                    className="form-control"
                    {...register('age', { required: true, min: 18 })} />
                {errors.age && <div className="text-danger">{errors.age.message}</div>}


            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default StudentForm