export class User {
    constructor(public id: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public email?: string,
                public img?: string) {}
}