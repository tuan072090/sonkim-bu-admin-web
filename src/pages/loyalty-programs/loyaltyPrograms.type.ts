export interface DataRow{
    id: number,
    name:string,
    avatar:{
        formats:{
            thumbnail:{
                url:string
            }
        }
    },
    business_unit:BusinessUnitType,
    levels:LevelType[],
    point_system:PointSystemType,
}

export interface BusinessUnitType{
    name:string,
    logo:{
        formats:{
            thumbnail:{
                url:string
            }
        }
    }
}

export interface LevelType{
    name:string,
}

export interface PointSystemType{
    name:string,
    icon:{
        formats:{
            thumbnail:{
                url:string
            }
        }
    }
}