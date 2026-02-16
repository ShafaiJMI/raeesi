import os
from uuid import uuid4

def rename_image(instance, filename):
    upload_to = instance._meta.model_name.lower()
    ext = filename.split('.')[-1]
    # generate a unique filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    
    # Check if the file with this name already exists, if so, append a unique identifier
    while os.path.exists(os.path.join(upload_to, filename)):
        filename = '{}-{}.{}'.format(instance.pk, uuid4().hex[:6], ext)

    # return the whole path to the file
    return os.path.join(upload_to, filename)
