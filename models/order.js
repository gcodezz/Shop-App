import moment from 'moment'

export default class Order {
    constructor (id, items, totalAmount, date) {
        this.id = id,
        this.items = items,
        this.totalAmount = totalAmount,
        this.date = moment(date.getTime()).format('MMM Do YYYY, hh:mm')
    }

    //get readableDate() {
        // return this.date.toLocaleString('en-EN', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })

        //return moment(this.date).format('MMM Do YYYY, hh:mm')
    }
//}