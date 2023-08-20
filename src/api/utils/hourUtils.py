import datetime

def venezuelaNow():
    utc_now = datetime.datetime.now()
    venezuelan_offset = datetime.timedelta(hours=-4)
    venezuelan_zone = datetime.timezone(venezuelan_offset)
    return utc_now.astimezone(venezuelan_zone)
