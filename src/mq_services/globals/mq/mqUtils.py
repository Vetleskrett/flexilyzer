import pika
from pika.exchange_type import ExchangeType
from pika.frame import Method


#always declare all exchanges to avoid problems at startup
#TODO: fix this ^

class MQUtils:
    connection_parameters = pika.ConnectionParameters('localhost')
    connection = pika.BlockingConnection(connection_parameters)
    
    @classmethod
    def initialize_consumer(cls, in_exchange):

        in_channel = cls.connection.channel()
        in_channel.exchange_declare(exchange=in_exchange, exchange_type=ExchangeType.fanout)
        in_queue: Method = in_channel.queue_declare(queue='', exclusive=True)
        in_channel.queue_bind(exchange=in_exchange, queue=in_queue.method.queue)

        return in_channel, in_queue

    @classmethod
    def initialize_publisher(cls, out_exchange):

        out_channel = cls.connection.channel()
        out_channel.exchange_declare(exchange=out_exchange, exchange_type=ExchangeType.fanout)


        return out_channel 
    
