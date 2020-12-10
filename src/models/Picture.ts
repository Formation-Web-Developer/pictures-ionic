export class Picture{
    constructor(
        readonly id: number,
        public name: string,
        readonly data: string,
        readonly published: number
    ) {}
}
