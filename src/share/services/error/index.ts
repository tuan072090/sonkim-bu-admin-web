
class MyError {
    public status: number;
    public message: string;
    public code = 0;
    public errors: any[] = []

    constructor(status: number, message: string, code?: number, errors?: any[]) {

        this.status = status;
        this.message = message;
        this.code = code ? code : 0
        this.errors = errors ? errors : []
    }
}

export default MyError
