from mq_services.globals import mq




@mq.consumer("done")
def myanalyzer(body):
    
    #do some kind of analytics here
    #return finished report
    print("writing to db...: ", body)



