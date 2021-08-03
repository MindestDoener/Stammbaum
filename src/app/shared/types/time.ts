import { NgbCalendarGregorian, NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class Time {
    minutes: number;
    hours: number;
    seconds?: number;

    constructor(hours: number, minutes: number, seconds?: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    /**
     * Checks if the current time is before another time.
     */
    before = (time: Time) => {
        if (time.hours > this.hours) {
            return true;
        }
        if (time.hours === this.hours && time.minutes > this.minutes) {
            return true;
        }
        if (time.seconds && this.seconds && time.hours === this.hours && time.minutes === this.minutes && time.seconds > this.seconds) {
            return true;
        }
        return false;
    };

    /**
     * Checks if the current time is after another time.
     */
    after = (time: Time) => {
        if (time.hours < this.hours) {
            return true;
        }
        if (time.hours === this.hours && time.minutes < this.minutes) {
            return true;
        }
        if (time.seconds && this.seconds && time.hours === this.hours && time.minutes === this.minutes && time.seconds < this.seconds) {
            return true;
        }
        return false;
    };

    /**
     * Checks if the current time is equal to another time.
     */
    equals = (time: Time) => {
        if (time.seconds && this.seconds && time.hours === this.hours && time.minutes === this.minutes && time.seconds === this.seconds) {
            return true;
        }
        if (!time.seconds && !this.seconds && time.hours === this.hours && time.minutes === this.minutes) {
            return true;
        }
        return false;
    };

    toString = (includeSeconds?: boolean) => {
        if (this.seconds && includeSeconds) {
            return `${this.makeTwoDigit(this.hours)}:${this.makeTwoDigit(this.minutes)}:${this.makeTwoDigit(this.seconds)}`;
        }
        return `${this.makeTwoDigit(this.hours)}:${this.makeTwoDigit(this.minutes)}`;
    };

    private makeTwoDigit = (num: number) => {
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    };
}

export function getToday(): NgbDate {
  return new NgbCalendarGregorian().getToday();
}

export function getNow(): Time {
  const now = new Date();
  return new Time(now.getHours(), now.getMinutes(), now.getSeconds());
}

export interface TimeStruct {
  minutes: number;
  hours: number;
  seconds?: number;
}
