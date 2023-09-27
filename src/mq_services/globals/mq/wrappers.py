from mq.mqUtils import MQUtils


def consumer(in_exchange):
    def dec(func):
        def on_message_received_wrapper(ch, method, properties, body):
            func(body)
                
        in_channel, in_queue = MQUtils.initialize_consumer(in_exchange)
        
        in_channel.basic_consume(queue=in_queue.method.queue, auto_ack=True, on_message_callback=on_message_received_wrapper)
        print(f"Starting Consuming from {in_exchange}")
        in_channel.start_consuming()

    return dec
        


def publisher(out_exchange):
    def dec(func):
        def on_message_send_wrapper(*args, **kwargs):
                resp = func(*args, **kwargs)
                
                out_channel.basic_publish(exchange=out_exchange, routing_key="", body=resp)

        out_channel = MQUtils.initialize_publisher(out_exchange)
        
        return on_message_send_wrapper        
    return dec


     
