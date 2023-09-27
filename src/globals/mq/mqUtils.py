import pika
from pika.exchange_type import ExchangeType
from pika.frame import Method

from dotenv import load_dotenv
import os


#always declare all exchanges to avoid problems at startup
#TODO: fix this ^

load_dotenv()

class MQUtils:
    rabbitMqTarget = "localhost" if os.getenv("RABBITMQ_CONTEXT")=="LOCAL" else "rabbitmq"
    connection_parameters = pika.ConnectionParameters(rabbitMqTarget)
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
    
