exception_printer(e)

def exception_printer(e):
    report = {}
    tb =e.__traceback__

    while tb is not None:
        report["filename"] = tb.tb_frame.f_code.co_filename
        report["name"] = tb.tb_frame.f_code.co_name
        report["lineno"] = tb.tb_lineno
        b = tb.tb_next
        break
    report["type"] = str(type(e).__name__)    
    report["message"] = str(e)
    print(report)