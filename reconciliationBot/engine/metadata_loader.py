import json
import os

def load_flow_json():
    """
    Metadata folder se flow.json load karke dictionary return karta hai
    """
    try:
        # File ka absolute path dhoondho
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        json_path = os.path.join(base_dir, 'metadata', 'flow.json')
        
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print("✅ flow.json successfully loaded!")
            return data
    except Exception as e:
        print(f"❌ Error loading flow.json: {e}")
        return {}