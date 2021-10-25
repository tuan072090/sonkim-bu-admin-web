import { CustomError } from 'ts-custom-error'

class MyError extends CustomError {
    public status: number;
    public code = 0;
    public errors: any[] = []

    constructor(status: number, message: string, code?: number, errors?: any[]) {
        super(message)

        this.status = status
        this.code = code ? code : 0
        this.errors = errors ? errors : []
    }
}

export default MyError
