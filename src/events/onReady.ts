import { CronJob } from "cron"
import { Client } from "discord.js"

// import findChannel from "../helpers/findChannel"
// import findGuild from "../helpers/findGuild"
import { saveNewRecommendedBooksToSheet } from "../sheets"

const onReady = (client: Client): void => {
  const cronInterval = "0 */6 * * *"

  // this is a cron job, to know more go to
  // https://crontab.guru/
  // this job starts every 6 hours
  const recurringJob = new CronJob(cronInterval, () => {
    saveNewRecommendedBooksToSheet(client)
  })

  recurringJob.start()
  console.log(
    `Job scheduled, cron is ${cronInterval} | will save recommended books to a sheet`
  )
}

export default onReady
