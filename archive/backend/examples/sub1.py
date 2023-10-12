import mq_services.globals.mq as mq




@mq.consumer("analyzer")
@mq.publisher("done")
def myanalyzer(body):
    
    #do some kind of analytics here
    #return finished report
    report = body.decode() + " - jamie vardy"

    return report





