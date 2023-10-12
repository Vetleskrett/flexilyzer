import mq

@mq.publisher("analyzer")
def myfunc(msg):
    return msg


project_id = "72724"

myfunc(project_id)
