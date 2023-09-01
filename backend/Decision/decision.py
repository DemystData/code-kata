def make_decision(pre_assessment):
    if pre_assessment == 60:
        return {'approval': 'Approved with 60% of Requested Value', 'reason': '60 preAssessment'}
    elif pre_assessment >=60 :
        return {'approval': 'Approved', 'reason': 'High preAssessment'}
    else:
        return {'approval': 'Rejected', 'reason': 'Low preAssessment'}
