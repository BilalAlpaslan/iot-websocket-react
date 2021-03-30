from kafka import KafkaProducer
from kafka.errors import KafkaError
import json

producer = KafkaProducer(
    bootstrap_servers=["192.168.1.112:9092"],
    client_id="my_p_id"
    )

# future = producer.send('logs2',b"py den mesaj",partition=1)
future = producer.send('logs2',b"py den mesaj",)

try:record_metadata = future.get(timeout=10)
except KafkaError:log.exception()

# print (record_metadata.topic)
# print (record_metadata.partition)
# print (record_metadata.offset)

# produce keyed messages to enable hashed partitioning
# producer.send('logs2',value=b'deneme')

# producer = KafkaProducer(value_serializer=json.dumps)
# producer.send('logs2', {'key': 'value'})

# produce json messages
# producer = KafkaProducer(value_serializer=lambda m: json.dumps(m).encode('ascii'))
# producer.send('logs2', {'key': 'value'})

# produce asynchronously
# for _ in range(10):
#     producer.send('logs2',b"for")

# def on_send_success(record_metadata):
#     print(record_metadata.topic)
#     print(record_metadata.partition)
#     print(record_metadata.offset)

# def on_send_error(excp):
#     log.error('I am an errback', exc_info=excp)

# # produce asynchronously with callbacks
# producer.send('t1', b'raw_bytes').add_callback(on_send_success).add_errback(on_send_error)

# block until all async messages are sent
# producer.flush()