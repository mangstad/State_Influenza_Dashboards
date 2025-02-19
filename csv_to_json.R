library(jsonlite)
dat = read.csv('dashboard_urls.csv')
#json = toJSON(dat,pretty=T)
write_json(dat,"dashboard_urls.json",pretty=T)
