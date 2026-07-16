import { useNavigate } from 'react-router-dom'
import FarmerHome from '../../components/FarmerHome'

export default function FarmerHomeRoute() {
  const navigate = useNavigate()

  return <FarmerHome onLapor={() => navigate('/peternak/lapor')} />
}
